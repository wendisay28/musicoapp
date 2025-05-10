import { toast } from "@/components/ui/use-toast"
import { logger } from "./logger"

export function handleError(error: unknown) {
  const errorMessage = error instanceof Error ? error.message : "Ha ocurrido un error inesperado"
  
  toast({
    variant: "destructive",
    title: "Error",
    description: errorMessage,
  })

  logger.error(errorMessage, {
    error,
    stack: error instanceof Error ? error.stack : undefined,
  })
} 