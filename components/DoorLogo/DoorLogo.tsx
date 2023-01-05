interface Props {
  color: string;
  width: number;
  height: number;
}

const DoorLogo = ({ color, width, height }: Props): JSX.Element => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.067 2.25a.75.75 0 0 0 0 1.5v-1.5Zm0 18a.75.75 0 0 0 0 1.5v-1.5ZM20.5 3.75a.75.75 0 0 1 .53.22l1.06-1.061a2.25 2.25 0 0 0-1.59-.659v1.5Zm.53.22c.14.14.22.331.22.53h1.5a2.25 2.25 0 0 0-.66-1.591l-1.06 1.06Zm.22.53v15h1.5v-15h-1.5Zm0 15a.75.75 0 0 1-.22.53l1.06 1.061a2.25 2.25 0 0 0 .66-1.591h-1.5Zm-.22.53a.75.75 0 0 1-.53.22v1.5a2.25 2.25 0 0 0 1.59-.659l-1.06-1.06ZM16.067 3.75H20.5v-1.5h-4.433v1.5Zm4.433 16.5h-4.433v1.5H20.5v-1.5ZM12.103 22.993l-.099.743.1-.743Zm-9.428-1.258.099-.743h-.001l-.098.743ZM2 21.01h.75H2ZM2 3.906h.75v-.001H2Zm.621-.718.147.735a.739.739 0 0 0 .022-.004l-.169-.731Zm9.429-2.172-.147-.735a.712.712 0 0 0-.021.004l.168.731Zm.95.718h-.75.75Zm0 20.533h.75H13Zm-.798-.018-9.428-1.257-.198 1.487 9.428 1.257.198-1.487Zm-9.43-1.257a.073.073 0 0 1-.023-.007l-.008-.006-1.098 1.022c.247.266.58.431.933.478l.197-1.487Zm-.03-.013v.002l.004.007a.061.061 0 0 1 .004.022h-1.5c0 .372.144.723.393.99l1.098-1.02Zm.008.03V3.907h-1.5V21.01h1.5Zm0-17.104a.06.06 0 0 1-.004.021.031.031 0 0 1-.004.009l-1.135-.982a1.453 1.453 0 0 0-.357.953l1.5-.001Zm-.008.03s.007-.008.026-.012l-.294-1.47c-.332.066-.64.239-.867.5l1.135.982Zm.048-.016 9.428-2.172-.336-1.462-9.43 2.172.338 1.462Zm9.407-2.167a.09.09 0 0 1 .037 0L12.56.288a1.59 1.59 0 0 0-.657-.007l.294 1.47Zm.037 0a.06.06 0 0 1 .023.01L13.16.565a1.56 1.56 0 0 0-.6-.277l-.327 1.464Zm.023.01c.003.002.001.002-.001-.003l1.335-.682a1.494 1.494 0 0 0-.43-.512l-.904 1.197Zm-.001-.003a.058.058 0 0 1-.006-.026l1.5.002c0-.23-.055-.455-.159-.658l-1.335.682Zm-.006-.025v20.533h1.5V1.734h-1.5Zm0 20.533c0-.011.003-.02.005-.025l1.347.66c.097-.197.148-.414.148-.634l-1.5-.001Zm.005-.025c.003-.006.005-.006.002-.004l.944 1.166c.167-.136.305-.306.401-.503l-1.347-.66Zm.002-.004a.056.056 0 0 1-.02.009l.398 1.446c.205-.056.398-.154.566-.29l-.944-1.165Zm-.02.009a.091.091 0 0 1-.035.002l-.198 1.487c.21.028.426.014.63-.043l-.396-1.446ZM8.5 11.25a.75.75 0 0 0 0 1.5v-1.5Zm1.5 1.5a.75.75 0 0 0 0-1.5v1.5Zm-1.5 0H10v-1.5H8.5v1.5Z"
      fill={color}
    />
  </svg>
);

export default DoorLogo;
