cuteBot.trackEvent(cuteBot.MbPins.Left, cuteBot.MbEvents.FindLine, function () {
    if (moving) {
        cuteBot.stopcar()
        while (!(cuteBot.tracking(cuteBot.TrackingState.L_R_unline))) {
            if (cuteBot.tracking(cuteBot.TrackingState.L_R_line)) {
                if (speed > 0) {
                    cuteBot.moveTime(cuteBot.Direction.backward, 100, 0.1)
                } else {
                    cuteBot.moveTime(cuteBot.Direction.forward, 100, 0.1)
                }
            } else {
                cuteBot.turnright()
            }
        }
        // resume motion
        commandCar()
    }
})
cuteBot.trackEvent(cuteBot.MbPins.Right, cuteBot.MbEvents.FindLine, function () {
    if (moving) {
        cuteBot.stopcar()
        while (!(cuteBot.tracking(cuteBot.TrackingState.L_R_unline))) {
            if (cuteBot.tracking(cuteBot.TrackingState.L_R_line)) {
                if (speed > 0) {
                    cuteBot.moveTime(cuteBot.Direction.backward, 100, 0.1)
                } else {
                    cuteBot.moveTime(cuteBot.Direction.forward, 100, 0.1)
                }
            } else {
                cuteBot.turnleft()
            }
        }
        // resume motion
        commandCar()
    }
})
radio.onReceivedString(function (receivedString) {
    // Change variables based on command
    if (receivedString == "start_stop") {
        // flip from true to false or vice versa
        moving = !(moving)
        if (moving) {
            basic.showIcon(IconNames.Yes)
        } else {
            cuteBot.stopcar()
            basic.showIcon(IconNames.No)
        }
    } else if (receivedString == "reverse") {
        // commands take too long to execute
        cuteBot.stopcar()
        speed = speed * -1
        // so remote can display F or R
        radio.sendNumber(speed)
        if (speed < 0) {
            // red headlights for reverse
            cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff0000)
        } else {
            // white headlights for forward
            cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xffffff)
        }
    } else {
        // receivedString is left, right, or straight
        direction = receivedString
    }
    // now change movement of car
    commandCar()
})
function commandCar () {
    if (!(moving)) {
        cuteBot.stopcar()
    } else if (direction == "straight") {
        cuteBot.motors(speed, speed)
    } else if (direction == "left") {
        cuteBot.motors(-1 * speed, speed)
    } else if (direction == "right") {
        cuteBot.motors(speed, -1 * speed)
    }
}
let speed = 0
let direction = ""
let moving = false
cuteBot.stopcar()
moving = false
// left, right, or straight, incl in reverse
direction = "straight"
// Can be negative for reverse
speed = 50
basic.showIcon(IconNames.No)
// white headlights for forward
cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xffffff)
// must be same as remote control
radio.setGroup(0)
