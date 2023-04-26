# List Of City
> http://localhost:9500/location

# List of Restaurants
> http://localhost:9500/restaurants

# Restaurants wrt City
> http://localhost:9500/restaurants?stateId=3

# List of mealType
> http://localhost:9500/mealType

(http://localhost:9500/restaurants?mealId=4&stateId=3)

# List of Restaurants wrt to meal
> http://localhost:9500/restaurants?mealId=3

# Filter on basis of meal + cuisine
> http://localhost:9500/filters/1?cuisineId=4

# Filter on basis of meal + cost
> http://localhost:9500/filters/1?lcost=100&hcost=500
> http://localhost:9500/filters/1?lcost=100&hcost=500&sort=-1

# Details of restaurant
> http://localhost:9500/details/10

# Menu wrt to restaurant
> http://localhost:9500/menu/10

# Menu details (post)
> http://localhost:9500/menuItem
{
	"id":[1,2,3]
}

# Place order (POST)
> http://localhost:9500/placeOrder
{
	"orderId" : 3,
	"name" : "Rushikesh",
	"email" : "rushi@gmail.com",
	"address" : "Hom 65",
	"phone" : 7447640893,
	"cost" : 391,
	"menuItem" : [
		3,65,12
	]
}

# List of all order
> http://localhost:9500/viewOrder

# List of all order wrt to email
> http://localhost:9500/viewOrder?email=ankit@gmail.com

# Update the order (PUT)
> http://localhost:9500/updateOrder/1

{
	"status":"Delivered",
	"bank_name":"Axis Bank",
	"date":"07/01/2023"
}

# Delete order (Delete)
> http://localhost:9500/deleteOrder/63a854090e78b8c74289445c