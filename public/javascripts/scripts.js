function init() {
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.init('scheduler_here', new Date(2019, 04, 1), "month");

    scheduler.templates.xml_date = function (value) {
        return new Date(value);
    };
    scheduler.load("/data", "json");

    const dp = new dataProcessor("/data");
    dp.init(scheduler);
    dp.setTransactionMode("POST", false);
}