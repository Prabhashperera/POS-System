
export default class OrderModel {
    constructor(ord_id, ord_date, cust_id, cust_name, cust_Address,customer_Number, ord_items=[], total_amount,cash,discount) {
        this.order_ID = ord_id;
        this.order_Date = ord_date;
        this.customer_ID = cust_id;
        this.customer_Name = cust_name;
        this.customer_Address = cust_Address;
        this.customer_Number = customer_Number;
        this.order_Items = ord_items;

        this.total_order_amount = total_amount;
        this.order_cash = cash;
        this.order_discount = discount;
    }

    /**
     * @param {(arg0: import("./ItemModel").default) => void} item
     */
    set setItems(item) {
        if(item != null) {
            this.order_Items.push(item);
        }
    }

    reset() {
    this.order_ID = "";
    this.order_Date = "";
    this.customer_ID = "";
    this.customer_Name = "";
    this.customer_Address = "";
    this.customer_Number = "";
    this.order_Items = [];
    this.total_order_amount = 0;
    this.order_cash = 0;
    this.order_discount = 0;
}

}
