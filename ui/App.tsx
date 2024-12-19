import ColorPickerInput from '@components/ColorPickerInput';
import './reset.css';
import './App.css';
import Swatches from '@components/Swatches';

function App() {
  return (
    <div className="container flex">
      <ColorPickerInput />
      <Swatches />
    </div>
  );
}

export default App;
