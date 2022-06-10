def my_function():
    if moving:
        cuteBot.stopcar()
        while not (cuteBot.tracking(cuteBot.TrackingState.L_R_UNLINE)):
            cuteBot.turnright()
        # resume motion
        commandCar()
cuteBot.track_event(cuteBot.MbPins.LEFT, cuteBot.MbEvents.FIND_LINE, my_function)

def my_function2():
    if moving:
        cuteBot.stopcar()
        while not (cuteBot.tracking(cuteBot.TrackingState.L_R_UNLINE)):
            cuteBot.turnleft()
        # resume motion
        commandCar()
cuteBot.track_event(cuteBot.MbPins.RIGHT,
    cuteBot.MbEvents.FIND_LINE,
    my_function2)

def on_received_string(receivedString):
    global moving, speed, direction
    # Change variables based on command
    if receivedString == "start_stop":
        # flip from true to false or vice versa
        moving = not (moving)
        if moving:
            basic.show_icon(IconNames.YES)
        else:
            cuteBot.stopcar()
            basic.show_icon(IconNames.NO)
    elif receivedString == "reverse":
        # commands take too long to execute
        cuteBot.stopcar()
        speed = speed * -1
        # so remote can display F or R
        radio.send_number(speed)
        if speed < 0:
            # red headlights for reverse
            cuteBot.color_light(cuteBot.RGBLights.ALL, 0xff0000)
        else:
            # white headlights for forward
            cuteBot.color_light(cuteBot.RGBLights.ALL, 0xffffff)
    else:
        # receivedString is left, right, or straight
        direction = receivedString
    # now change movement of car
    commandCar()
radio.on_received_string(on_received_string)

def commandCar():
    if not (moving):
        cuteBot.stopcar()
    elif direction == "straight":
        cuteBot.motors(speed, speed)
    elif direction == "left":
        cuteBot.motors(-1 * speed, speed)
    elif direction == "right":
        cuteBot.motors(speed, -1 * speed)
speed = 0
direction = ""
moving = False
cuteBot.stopcar()
moving = False
# left, right, or straight, incl in reverse
direction = "straight"
# Can be negative for reverse
speed = 50
basic.show_icon(IconNames.NO)
# white headlights for forward
cuteBot.color_light(cuteBot.RGBLights.ALL, 0xffffff)
# must be same as remote control
radio.set_group(0)