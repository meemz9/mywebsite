import ConnectIcons from "./ConnectIcons";
export default function ContactSection() {
  return (
    <section id="contact" className="text-center py-24 px-6">
      <h2 className="text-5xl font-semibold mb-4 text-accent custom-font">Let's Connect!</h2>
      <p className="text-secondary mb-6">
        I’m always open to connecting, collaborating, or just chatting tech!
      </p>
      <ConnectIcons />
      <p className="text-gray-600 text-sm mt-12">
        © 2025 Meem Zulkernine
      </p>
    </section>
  );
}
