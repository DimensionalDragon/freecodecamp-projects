class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def __str__(self):
        return f'Rectangle(width={self.width}, height={self.height})'

    def set_width(self, width):
        self.width = width
        
    def set_height(self, height):
        self.height = height

    def get_area(self):
        return self.width * self.height

    def get_perimeter(self):
        return 2 * (self.width + self.height)

    def get_diagonal(self):
        return (self.width ** 2 + self.height ** 2) ** 0.5

    def get_picture(self):
        return ('*' * self.width + '\n') * self.height if self.width <= 50 else 'Too big for picture.'

    def get_amount_inside(self, other_shape):
        return self.get_area() // other_shape.get_area()

class Square(Rectangle):
    def __init__(self, side):
        Rectangle.__init__(self, side, side)
        self.side = side

    def __str__(self):
        return f'Square(side={self.side})'

    def set_side(self, side):
        self.width = side
        self.height = side
        self.side = side
        
    def set_width(self, width):
        self.width = width
        self.height = width
        self.side = width
    
    def set_height(self, height):
        self.width = height
        self.height = height
        self.side = height