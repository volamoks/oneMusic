import { loader } from '../assets';

const Loader = ({ title }) => (
    <div className="w-full flex justify-center items-center flex-col">
        <img
            className="w-34 h32 object-contain"
            src={loader}
            alt="loader"
        />
        <h1 className="font-bold text-2xl mt-2 text-white">
            {title || 'Loading'}
        </h1>
    </div>
);

export default Loader;
