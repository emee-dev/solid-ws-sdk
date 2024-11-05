// Import Solid.js features
import { createSignal, onMount } from 'solid-js';

// WebSocketForm component
export default function WebSocketForm() {
  // Create a reactive state for the input field and the WebSocket instance
  const [inputValue, setInputValue] = createSignal('');
  let socket: WebSocket;

  // Establish WebSocket connection on component mount
  onMount(() => {
    // Replace with your WebSocket server URL
    socket = new WebSocket(
      'wss://jvmipmkpwpgithub-ytsf--3000--34c588ed.local-corp.webcontainer.io/ws'
    );

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Optional: Cleanup on component unmount (if needed)
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent traditional form submission

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(inputValue()); // Send the input value to WebSocket
      console.log('Message sent:', inputValue());
      setInputValue(''); // Clear the input field
    } else {
      console.warn('WebSocket is not open');
    }
  };

  return (
    <div>
      <h2>WebSocket Form</h2>
      <form onSubmit={handleSubmit}>
        <label for="inputField">Enter Message:</label>
        <input
          type="text"
          id="inputField"
          required
          value={inputValue()}
          onInput={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
