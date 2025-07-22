import './homepage.component.scss';
import Footer from '../components/Footer';
import DataWarehouse from '../components/DataWarehouse';

interface HomePageProps {
  isLoggedIn: boolean;
  onSignIn: () => void;
  onLogout: () => void;
  onProfile: () => void;
}

const HomePage = ({ isLoggedIn, onSignIn, onLogout, onProfile }: HomePageProps) => {
  return (
    <div className="homepage">
      <DataWarehouse
        isLoggedIn={isLoggedIn}
        onSignIn={onSignIn}
        onLogout={onLogout}
        onProfile={onProfile}
      />
      <Footer />
    </div>
  );
};

export default HomePage;
