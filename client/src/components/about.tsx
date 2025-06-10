// src/pages/AboutPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Github, Linkedin } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-10 px-4 md:px-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-2">About Our App</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A powerful yet minimal finance tracking app designed to help you take control of your money, set goals, and make smarter financial decisions.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* Alwin */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <Card className="rounded-2xl shadow-lg">
              <CardHeader className="flex items-center gap-4">
                <Avatar className="w-14 h-14">
                  <AvatarFallback>AA</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">Alwin</CardTitle>
                  <p className="text-sm text-muted-foreground">Frontend Developer</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built a clean, responsive, and intuitive UI using TypeScript, Tailwind CSS, and shadcn/ui — ensuring a delightful user experience.
                </p>
                <div className="flex gap-4 mt-4">
                  <a
  href="https://github.com/alwinalbert"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Alwin GitHub"
>
  <Github className="w-5 h-5 hover:text-primary" />
</a>
<a
  href="https://www.linkedin.com/in/alwin-albert-7047162a0/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Alwin LinkedIn"
>
  <Linkedin className="w-5 h-5 hover:text-primary" />
</a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sreeram */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <Card className="rounded-2xl shadow-lg">
              <CardHeader className="flex items-center gap-4">
                <Avatar className="w-14 h-14">
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">Sreeram</CardTitle>
                  <p className="text-sm text-muted-foreground">Backend Developer</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Architected the backend with Node.js, Express, MongoDB, and TypeScript — enabling secure, scalable API endpoints with JWT, Zod, and OAuth-ready architecture.
                </p>
                <div className="flex gap-4 mt-4">
                  <a
  href="https://github.com/sreeramathrij"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="sreeram GitHub"
>
  <Github className="w-5 h-5 hover:text-primary" />
</a>
<a
  href="https://www.linkedin.com/in/sreeramathrij/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="sreeram LinkedIn"
>
  <Linkedin className="w-5 h-5 hover:text-primary" />
</a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="text-center pt-10">
          <p className="text-sm text-muted-foreground">
            Built with 💙 using MERN Stack, Tailwind CSS, and shadcn/ui.
          </p>
        </div>
      </div>
    </div>
  )
}
