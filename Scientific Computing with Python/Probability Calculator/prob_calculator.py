import copy
import random
# Consider using the modules imported above.

class Hat:
    def __init__(self, **colors):
        self.contents = []
        for key, value in colors.items():
            for i in range(value):
                self.contents.append(key)
        print(self.contents)

    def draw(self, quantity):
        if quantity > len(self.contents):
            return self.contents
        draw_results = []
        for i in range(quantity):
            next_index = random.randint(0, len(self.contents) - 1)
            draw_results.append(self.contents.pop(next_index))
        return draw_results


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    success_count = 0
    for _ in range(num_experiments):
        temporary_hat = copy.copy(hat.contents)
        success = True
        draw_result = hat.draw(num_balls_drawn)
        for key, value in expected_balls.items():
            draw_color_count = len([color for color in draw_result if color == key])
            if draw_color_count < value:
                success = False
        success_count += 1 if success == True else 0
        hat.contents = temporary_hat
    return (success_count / num_experiments)