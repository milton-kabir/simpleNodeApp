# SimpleNodeApp

**Without Database**

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
On success you will get the response: "Order Item is added to the list."

And again

body=>
    {
        "id":1,
        "quantity": 2,
        "product" : "Banana"
    }

On success you will get the response: "Order Item is added to the list."

POST request- /order:
body=>
    {
        "id":1,
        "phone": "+889854321"
    }
On success you will get the response: "New Order has been placed."



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
    "1": {
        "id": 1,
        "orderItems": [
            {
                "quantity": 3,
                "product": "Orange"
            }
        ],
        "phone": "+880123456789"
    },
    "2": {
        "id": 2,
        "orderItems": [
            {
                "quantity": 4,
                "product": "Apple"
            }
        ],
        "phone": "+889854321"
    }
}