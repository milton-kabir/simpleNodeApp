# SimpleNodeApp

**Finally Completed**

The app creates a database named "myDB". Then it adds 2 collection in "myDB". They are "order" and "orderItems".

At this stage you can send a POST request a item with ID to add it to orderItems. Also you can send a POST request to perform a order with ID. 

And if you send GET request with ID and phone number you will get your order consisting of orderitems and phone number for that ID. You can also send GET request to get all orders.

**Example**
```yaml
POST request- /orderItem:
body=>
    {
        "id":1,
        "quantity": 3,
        "product" : "Orange"
    }
On success you will get the response: "This order item has been added to the orderItems list."

And again

body=>
    {
        "id":1,
        "quantity": 2,
        "product" : "Banana"
    }

On success you will get the response: "This order item has been added to the orderItems list."


POST request- /order:
body=>
    {
        "id":1,
        "phone": "+889854321"
    }
On success you will get the response: "New Order with id: 1 has been placed."



GET request- /getOrderByID:
body=>
    {
        "id":1
    }

You will get response:
{
    "orderitems": [
        {
            "quantity": 3,
            "product": "Orange"
        },
        {
            "quantity": 2,
            "product": "Banana"
        }
    ],
    "phone": "+880123456789"
}


GET request- /getAllOrder:
body=>


You will get response:
{
    "All Orders": [
        {
            "_id": "610a843bad1cc64dc2296edf",
            "id": 1,
            "orderItems": [
                {
                    "quantity": 3,
                    "product": "Orange"
                },
                {
                    "quantity": 2,
                    "product": "Banana"
                }
            ],
            "phone": "+88987654321"
        }
    ]
}



Another user's orderItems is different. So their order is also different.
