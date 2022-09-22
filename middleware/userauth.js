export default function({redirect,}){
    const user = localStorage.getItem('user_access_token');
    if (!user) {
        return redirect('/login')
      }
     
}