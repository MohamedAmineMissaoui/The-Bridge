import "./Form.css";

export default function Form() {
  return (
    <form action="#" method="post">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Jiara Martins"
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="hello@reallygreatsite.com"
        required
      />

      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        name="message"
        rows="4"
        placeholder="Write your message here"
        required
      ></textarea>

      <button type="submit">Send the message</button>
    </form>
  );
}
