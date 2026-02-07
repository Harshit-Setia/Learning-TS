export function formatDate(dateString: string): string{
    const date=new Date(dateString).toLocaleString("en-US",{
        year:"numeric",
        month:"short",
        day:"numeric",
        hour:"numeric",
        minute:"numeric"
    })
    return date
}