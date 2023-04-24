exports.name = "John";

exports.product = function(name, price) {
    this.name = name;
    this.price = price;
};

exports.Utils = {
    product : function (name, price) {},
    count: 0,
    model: {
        name : null,
        email: null,
    }

}