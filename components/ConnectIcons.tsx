import { Github, Linkedin, Mail } from "lucide-react";

export default function ConnectIcons() {
    return (
        <>
            <div className="flex justify-center gap-6">
                <a href="https://linkedin.com/in/meem-zulkernine" aria-label="linkedin">
                    <Linkedin className="h-6 w-6 hover:text-accent transition-colors" />
                </a>
                <a href="https://github.com/meemz9" aria-label="github">
                    <Github className="h-6 w-6 hover:text-accent transition-colors" />
                </a>
                <a href="mailto:meemzulker9@gmail.com" aria-label="email">
                    <Mail className="h-6 w-6 hover:text-accent transition-colors" />
                </a>
            </div>
        </>
    );
}