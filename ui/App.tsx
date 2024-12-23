import ColorPickerInput from '@components/ColorPickerInput';
import Swatches from '@components/Swatches';
import Toolbar from '@components/Toolbar';
import Toaster from '@components/ui/sonner';
import './reset.css';
import './App.css';

function App() {
  return (
    <div className="container flex">
      <ColorPickerInput />
      <div className="flex flex-col my-4 mr-4 w-full gap-4">
        <Toolbar />
        <Swatches />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
