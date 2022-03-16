import './App.css';
import Webpages from './webpages';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faPlus, faCoffee, faMinus, faSave } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee, faPlus, faMinus,faSave)

function App() {
  return (
    <div>
      <Webpages />
    </div>
  );
}

export default App;
