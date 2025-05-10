import { useToast as useToastOriginal } from '@/features/shared/components/ui/use-toast';
export function useToast() {
    const { toast } = useToastOriginal();
    return {
        toast: ({ title, description, variant = 'default', duration = 5000 }) => {
            toast({
                title,
                description,
                variant,
                duration,
            });
        },
    };
}
