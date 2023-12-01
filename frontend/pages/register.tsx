import Register from '../components/Register';

const RegisterPage: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Register toggleView={function (): void {
              throw new Error('Function not implemented.');
          } } />
    </div>
  );
}

export default RegisterPage;
