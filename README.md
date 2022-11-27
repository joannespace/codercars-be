# CoderCars Backend

## Instructions

1. Clone the branch `template`.
2. Rename `.env.example` to `.env` and supply your own MongoDB URI or leave as is to use your local MongoDB URI.
3. Based on the provided schema, parse and import the data frorm [this dataset](https://www.kaggle.com/datasets/CooperUnion/cardataset) into your database.
4. Fill in the missing logic in the controller. Remember to consider and handle all possible errors.
5. Test and make sure it works with the provided frontend.

## Requirements

### CREATE

`POST /car`
Expected body of request:

```json=
{
    "make": "Plymouth",
    "model": "Colt",
    "release_date": 2002,
    "transmission_type": "MANUAL",
    "size": "Compact",
    "style": "Coupe",
    "price": 23000
}
```

Expected response:

```json=
{
    "message": "Create Car Successfully!",
    "car": {
        "make": "Plymouth",
        "model": "Colt",
        "release_date": 2002,
        "transmission_type": "MANUAL",
        "size": "Compact",
        "style": "Coupe",
        "price": 23000,
    }
}
```

### READ

`GET /car`

Expected response:

```json=
{
    "message": "Get Car List Successfully!",
    "cars": [
        //car objects
    ],
    "page": 1,
    // total pages
    "total": 1192
}
```

### UPDATE

`PUT /car/:id`

Expected response:

```json=
{
    "message": "Update Car Successfully!",
    {
    //car object
    }
}
```

### DELETE

`DELETE /car/:id`

Expected response:

```json=
{
    "message": "Delete Car Successfully!",
    {
    //car object
    }
}
```
