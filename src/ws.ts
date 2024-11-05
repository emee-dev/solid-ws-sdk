import { eventHandler } from 'vinxi/http';

// Algo
// useQuery(fnId, args)
// const mutation = useMutation(fnId)
// mutation(args)

// Under the hood whichever function was called first set the websocket
// object and reuse it.
// the fnId is passed to the ws eventHandler which calls the appropriate function on the server and streams it's json response.

const functions = {
  getUserById: async (args: { user: string }) => {
    return { userId: 1, userName: 'emee' };
  },
};

// type ArgumentType<T> = T extends (args: infer A) => any ? A : never;

// function query<T extends (args: any) => any>(fn: T, args: ArgumentType<T>) {
//   // Your implementation here
// }

// query(functions.getUserById, { user: '' });


export default eventHandler({
  handler() {},
  websocket: {
    async open(peer) {
      console.log('open', peer.id, peer.url);
    },
    async message(peer, msg) {
      const message = msg.text();
      console.log('server:recieved: ', peer.id, peer.url, message);
    },
    async close(peer, details) {
      console.log('server:close', peer.id, peer.url);
    },
    async error(peer, error) {
      console.log('server:error', peer.id, peer.url, error);
    },
  },
});
