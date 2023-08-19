export default function formatDate(dateString:string,shouldIncludeYear?:boolean) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
  
    const date = new Date(dateString)
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
  
    return shouldIncludeYear ? `${day} ${month} ${year}` : `${day} ${month}`;
} 