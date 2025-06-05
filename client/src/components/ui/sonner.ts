import { Toaster as SonnerToaster, toast } from "sonner"
import type { ToasterProps } from "sonner"
import type { FC } from "react"

export { toast }

export const Toaster: FC<ToasterProps> = (props) => {
  return <SonnerToaster {...props} />
}
