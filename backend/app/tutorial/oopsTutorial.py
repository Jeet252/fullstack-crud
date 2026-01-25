
class Tutorial:
    def basicConcept(self):
        class Car:
            def __init__(self,brand,model):
                self.brand= brand
                self.model= model
            def fullname(self):
                return f'{self.brand} {self.model}'
            
        def tutorial():
            car_instance = Car("Toyoto","Carolla")
            return {
                "brand": car_instance.brand, 
                "model": car_instance.model,
                "full_name": car_instance.fullname()
            }
        return tutorial()


    def inhertance(self):
        class Car:
            def __init__(self,brand,model):
                self.brand= brand
                self.model= model
            def fullname(self):
                return f'{self.brand} {self.model}'
            
        class ElectronicCars(Car):
            def __init__(self,brand,model,battery_size):
                super().__init__(brand,model)
                self.battery_size=battery_size
        def tutorial():
            car_instance = ElectronicCars("Tesla","Jeet30","90KmH")
            return {
                "brand": car_instance.brand, 
                "model": car_instance.model,
                "battery_size": car_instance.battery_size,
                "full_name": car_instance.fullname()
            }
        return tutorial()
    

    def encapsulation(self):
        class Car:
            def __init__(self,brand,model):
                self.__brand= brand
                self.model= model
            def get_brand(self):
                return self.__brand + "123"
            def fullname(self):
                return f'{self.__brand} {self.model}'
            
        class ElectronicCars(Car):
            def __init__(self,brand,model,battery_size):
                super().__init__(brand,model)
                self.battery_size=battery_size
        def tutorial():
            car_instance = ElectronicCars("Tesla","Jeet30","90KmH")
            return {
                "brand": car_instance.get_brand(), 
                "model": car_instance.model,
                "battery_size": car_instance.battery_size,
                "full_name": car_instance.fullname()
            }
        return tutorial()

    def polymorphism(self):
        class Car:
            def __init__(self,brand,model):
                self.brand= brand
                self.model= model
            def fullname(self):
                return f'{self.brand} {self.model}'
            def fuel_type(self):
                return "Petrol or Desiel"
            
        class ElectronicCars(Car):
            def __init__(self,brand,model,battery_size):
                super().__init__(brand,model)
                self.battery_size=battery_size
            def fuel_type(self):
                self.fuel_type="Electric Charge"
                return self.fuel_type
        def tutorial():
            car_instance = [ElectronicCars("Tesla","Jeet30","90KmH").fuel_type(),
            Car("Mahindra","XUV").fuel_type()
            ]
            return car_instance
        return tutorial()

tutorial_concept=Tutorial()