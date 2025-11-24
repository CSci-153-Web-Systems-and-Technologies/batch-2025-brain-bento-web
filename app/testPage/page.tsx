export default function Test() {
  return (
    <div>
      URL: {process.env.NEXT_PUBLIC_SUPABASE_URL} <br/>
      KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Loaded' : 'Missing'}
    </div>
  )
}
