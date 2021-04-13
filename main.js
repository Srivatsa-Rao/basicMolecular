const { ServiceBroker } = require("moleculer");

// Create broker
let broker = new ServiceBroker();

// Create a service
broker.createService({
  name: "math",
  actions: {
    // You can call it as broker.call("math.add")
    add(ctx) {
      return Number(ctx.params.a) + Number(ctx.params.b);
    },

    // You can call it as broker.call("math.sub")
    sub(ctx) {
      return Number(ctx.params.a) - Number(ctx.params.b);
    },
  },
});

// Start broker
broker.start();

broker
  .start()
  .then(() => {
    return broker
      .call("math.add", { a: 5, b: 3 })
      .then((res) => broker.logger.info("  5 + 3 =", res));
  })
  .then(() => {
    return broker
      .call("math.sub", { a: 9, b: 2 })
      .then((res) => broker.logger.info("  9 - 2 =", res));
  })

  .catch((err) => {
    broker.logger.error(
      `Error occurred! Action: '${err.ctx.action.name}', Message: ${err.code} - ${err.message}`
    );
    if (err.data) broker.logger.error("Error data:", err.data);
  });
