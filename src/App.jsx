import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'


function App() {
  return (
    <>
    
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      <Navbar />
      <main className="container mx-auto max-w-5xl px-6">
        <HomePage />
      </main>
      <Footer />
    </>
  );
}
export default App



