/**
    AI engine for Panda.js Framework by@jotaSe
    
    @module AI
    @namespace game
    
**/
game.module(
    'engine.AI'
)
    .require(

        'engine.physics'
)
    .body(function () {
        'use strict';
        /**
        STEERING BEHAVIOR
        @class SteeringBehavior
        **/


        game.SteeringBehavior = game.Class.extend({
            /**
            Chasing behavior : Predator --> Prey    
             
            **/
            chase: function (Predator, Prey, x, y) {

                if (x !== 0) {

                    if (Predator.position.x > Prey.position.x) {
                        Predator.position.x -= x;
                        Predator.velocity.x = (Predator.velocity.x > 0) ? (-1 * Predator.velocity.x) : Predator.velocity.x;

                    } else if (Predator.position.x < Prey.position.x) {
                        Predator.position.x += x;
                        Predator.velocity.x = (Predator.velocity.x < 0) ? (-1 * Predator.velocity.x) : Predator.velocity.x;
                    }

                }
                if (y !== 0) {
                    if (Predator.position.y > Prey.position.y) {
                        Predator.position.y -= y;
                        Predator.velocity.y = (Predator.velocity.y > 0) ? (-1 * Predator.velocity.y) : Predator.velocity.y;
                    } else if (Predator.position.y < Prey.position.y) {
                        Predator.position.y += y;
                        Predator.velocity.y = (Predator.velocity.y < 0) ? (-1 * Predator.velocity.y) : Predator.velocity.y;
                    }

                }


            },

            seek: function (Predator, Prey, maxVelocity) {
                var temp = Prey.position.clone();
                temp.subtract(Predator.position);
                temp.normalize();
                temp.multiply(maxVelocity);
                Predator.velocity = temp;

            },
            seekForce: function (Predator, Prey, maxVelocity, maxForce, maxSpeed) {
                var velocity = Predator.velocity.clone();
                this.seek(Predator, Prey, maxVelocity);
                var steer = Predator.velocity.subtract(velocity);
                this.truncate(steer, maxForce);
                if (Predator.mass > 0) {
                    steer.divide(Predator.mass);
                }
                steer.add(velocity);
                this.truncate(steer, maxSpeed);
                Predator.velocity = steer;
                Predator.position.add(Predator.velocity);
            },
            flee: function (Predator, Prey, maxVelocity) {
                this.seek(Predator, Prey, maxVelocity);
                Predator.velocity.multiply(-1);
            },
            fleeForce: function (Predator, Prey, maxVelocity, maxForce, maxSpeed) {
                this.seekForce(Predator, Prey, maxVelocity, maxForce, maxSpeed);
                Predator.velocity.multiply(-1);
                Predator.position.multiply(-1);
            },
            pursuit: function (Predator, Prey, maxVelocity, distance) {
                Prey.add(Prey.velocity).multiply(distance);
                this.seek(Predator, Prey, maxVelocity);
            },
            evade: function (Predator, Prey, maxVelocity, distance) {
                Prey.add(Prey.velocity).multiply(distance);
                this.flee(Predator, Prey, maxVelocity);
            },
            truncate: function (vector, max) {
                if (vector.length() > max) {
                    vector.normalize();

                    vector *= max;
                }
            }


        })
    })