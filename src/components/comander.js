import 'bootstrap/dist/css/bootstrap.min.css'
import TrainingSession from './session'
import CreateLessons from './create-session'
import './tabledata.css';
import Footer from './Footer'
import Button from 'react-bootstrap/Button';

const CommanderLessons = (props) => {
	
	const handleLogout = () => {
		localStorage.removeItem("token");
		//window.location.reload();
		
	};

	return (
		<div>
           
			<nav>
				<h1>Lessons</h1>
				
			</nav>
			<div>
			<h3>Create lessons</h3>
			{/* < CreateLessons /> */}
		
        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
         Show list of lessons
        </Button>
			<TrainingSession />
			<br/><br/><br/>
			</div>
            <br/><br/>
            <Footer /> 
		</div>
	);
};

export default CommanderLessons;