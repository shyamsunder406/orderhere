const amqp = require('amqplib');

const msg = {
  orderId: 'ORD123',
  item: 'laptop',
  quantity: 1
};

async function publishMessage() {
  const conn = await amqp.connect('amqp://guest:guest@localhost:5672');
  const channel = await conn.createChannel();
  const exchange = 'order_exchange';

  await channel.assertExchange(exchange, 'topic', { durable: true });
  channel.publish(exchange, 'order.created', Buffer.from(JSON.stringify(msg)));

  console.log("Order published:", msg);

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
}

publishMessage();
