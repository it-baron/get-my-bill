import api from './api'
import PQueue from 'p-queue'

const queue = new PQueue({concurrency: 10});

queue.on('active', () => {
    console.log(`Working on item. Size: ${queue.size} Pending: ${queue.pending}`)
});

api(queue);
