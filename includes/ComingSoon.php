<?php

namespace NewfoldLabs\WP\Module\ComingSoon;

use NewfoldLabs\WP\ModuleLoader\Container;

use function NewfoldLabs\WP\ModuleLoader\container;

/**
 * This class adds a coming soon page functionality.
 **/
#[\AllowDynamicProperties]
class ComingSoon {

	/**
	 * Register functionality using WordPress Actions.
	 *
	 * @param Container $container the container from the module loader.
	 */
	public function __construct( Container $container ) {
		$this->container = $container;

		$coming_soon_svg = '<svg xmlns="http://www.w3.org/2000/svg" width="255" height="65" viewBox="0 0 215 55" fill="none"><path d="M214.376 22.8102C214.636 22.7102 214.826 22.8002 214.946 23.0802C215.066 23.3402 214.996 23.5202 214.736 23.6202C211.416 25.0802 208.006 26.8702 204.506 28.9902C203.446 29.6502 202.716 30.0702 202.316 30.2502C201.916 30.4102 201.586 30.4202 201.326 30.2802C201.026 30.1002 200.886 29.7702 200.906 29.2902C200.906 28.5902 201.246 27.2902 201.926 25.3902C202.526 23.6502 202.776 22.6602 202.676 22.4202C202.556 22.4002 202.366 22.4502 202.106 22.5702C201.166 23.0102 200.036 23.6602 198.716 24.5202C197.416 25.3602 196.336 26.0902 195.476 26.7102C194.616 27.3302 193.456 28.1902 191.996 29.2902L191.336 29.8002C190.456 30.4602 189.826 30.7902 189.446 30.7902C189.246 30.7902 189.076 30.7202 188.936 30.5802C188.836 30.4602 188.776 30.3302 188.756 30.1902C188.736 30.0502 188.866 29.7002 189.146 29.1402C189.406 28.5602 189.856 27.8102 190.496 26.8902C191.736 25.1302 192.886 23.7702 193.946 22.8102C194.166 22.6102 194.376 22.6202 194.576 22.8402C194.776 23.0402 194.766 23.2402 194.546 23.4402C193.706 24.2202 192.766 25.3102 191.726 26.7102C190.686 28.1102 190.036 29.1402 189.776 29.8002C190.036 29.6602 190.376 29.4302 190.796 29.1102L191.486 28.6002C192.966 27.4802 194.136 26.6102 194.996 25.9902C195.856 25.3502 196.956 24.6002 198.296 23.7402C199.636 22.8602 200.786 22.2002 201.746 21.7602C202.446 21.4602 202.956 21.4602 203.276 21.7602C203.436 21.9002 203.536 22.0802 203.576 22.3002C203.616 22.5002 203.596 22.7902 203.516 23.1702C203.436 23.5302 203.336 23.8802 203.216 24.2202C203.116 24.5602 202.956 25.0502 202.736 25.6902C202.096 27.4902 201.776 28.6902 201.776 29.2902C201.776 29.3502 201.786 29.4102 201.806 29.4702C202.026 29.4302 202.776 29.0202 204.056 28.2402C207.576 26.1002 211.016 24.2902 214.376 22.8102Z" fill="#121212"/><path d="M193.86 22.8405C194.14 22.7005 194.34 22.7705 194.46 23.0505C194.6 23.3105 194.53 23.5005 194.25 23.6205C191.15 25.1405 187.78 25.8205 184.14 25.6605C183.7 25.6405 183.27 25.6005 182.85 25.5405C182.57 26.2805 182.05 27.0205 181.29 27.7605C180.55 28.4805 179.71 29.1305 178.77 29.7105C177.29 30.6105 176.07 31.0605 175.11 31.0605C174.65 31.0605 174.28 30.9505 174 30.7305C173.46 30.2905 173.37 29.5505 173.73 28.5105C174.27 26.9105 175.57 25.0805 177.63 23.0205C177.63 22.8205 177.69 22.6305 177.81 22.4505C178.03 22.1305 178.43 21.9205 179.01 21.8205C179.61 21.7005 180.15 21.7005 180.63 21.8205C181.07 21.9205 181.45 22.0705 181.77 22.2705C182.11 22.4705 182.38 22.7205 182.58 23.0205C182.8 23.3205 182.95 23.6505 183.03 24.0105C183.07 24.2305 183.08 24.4605 183.06 24.7005C183.42 24.7205 183.79 24.7405 184.17 24.7605C187.67 24.9205 190.9 24.2805 193.86 22.8405ZM178.32 28.9605C179.14 28.4605 179.88 27.9005 180.54 27.2805C181.2 26.6405 181.67 26.0205 181.95 25.4205C180.09 25.1205 178.8 24.5905 178.08 23.8305C176.22 25.7305 175.05 27.3905 174.57 28.8105C174.35 29.4505 174.35 29.8605 174.57 30.0405C174.71 30.2405 175.15 30.2505 175.89 30.0705C176.61 29.8705 177.42 29.5005 178.32 28.9605ZM182.19 24.5805C182.21 24.4405 182.2 24.3105 182.16 24.1905C182.12 23.9505 182.03 23.7305 181.89 23.5305C181.75 23.3305 181.6 23.1805 181.44 23.0805C181.28 22.9805 181.1 22.9005 180.9 22.8405C180.7 22.7605 180.53 22.7105 180.39 22.6905C180.27 22.6705 180.15 22.6505 180.03 22.6305C179.43 22.5905 178.96 22.6705 178.62 22.8705C178.66 22.9705 178.67 23.0705 178.65 23.1705C179.21 23.8105 180.39 24.2805 182.19 24.5805Z" fill="#121212"/><path d="M178.127 22.8405C178.407 22.7005 178.607 22.7705 178.727 23.0505C178.867 23.3105 178.797 23.5005 178.517 23.6205C175.417 25.1405 172.047 25.8205 168.407 25.6605C167.967 25.6405 167.537 25.6005 167.117 25.5405C166.837 26.2805 166.317 27.0205 165.557 27.7605C164.817 28.4805 163.977 29.1305 163.037 29.7105C161.557 30.6105 160.337 31.0605 159.377 31.0605C158.917 31.0605 158.547 30.9505 158.267 30.7305C157.727 30.2905 157.637 29.5505 157.997 28.5105C158.537 26.9105 159.837 25.0805 161.897 23.0205C161.897 22.8205 161.957 22.6305 162.077 22.4505C162.297 22.1305 162.697 21.9205 163.277 21.8205C163.877 21.7005 164.417 21.7005 164.897 21.8205C165.337 21.9205 165.717 22.0705 166.037 22.2705C166.377 22.4705 166.647 22.7205 166.847 23.0205C167.067 23.3205 167.217 23.6505 167.297 24.0105C167.337 24.2305 167.347 24.4605 167.327 24.7005C167.687 24.7205 168.057 24.7405 168.437 24.7605C171.937 24.9205 175.167 24.2805 178.127 22.8405ZM162.587 28.9605C163.407 28.4605 164.147 27.9005 164.807 27.2805C165.467 26.6405 165.937 26.0205 166.217 25.4205C164.357 25.1205 163.067 24.5905 162.347 23.8305C160.487 25.7305 159.317 27.3905 158.837 28.8105C158.617 29.4505 158.617 29.8605 158.837 30.0405C158.977 30.2405 159.417 30.2505 160.157 30.0705C160.877 29.8705 161.687 29.5005 162.587 28.9605ZM166.457 24.5805C166.477 24.4405 166.467 24.3105 166.427 24.1905C166.387 23.9505 166.297 23.7305 166.157 23.5305C166.017 23.3305 165.867 23.1805 165.707 23.0805C165.547 22.9805 165.367 22.9005 165.167 22.8405C164.967 22.7605 164.797 22.7105 164.657 22.6905C164.537 22.6705 164.417 22.6505 164.297 22.6305C163.697 22.5905 163.227 22.6705 162.887 22.8705C162.927 22.9705 162.937 23.0705 162.917 23.1705C163.477 23.8105 164.657 24.2805 166.457 24.5805Z" fill="#121212"/><path d="M162.073 23.2605C162.193 23.2605 162.293 23.3005 162.373 23.3805C162.473 23.4605 162.523 23.5605 162.523 23.6805C162.523 23.8005 162.483 23.9105 162.403 24.0105C162.323 24.0905 162.223 24.1405 162.103 24.1605C159.103 24.3005 155.983 24.8105 152.743 25.6905C151.523 28.2305 149.513 30.9105 146.713 33.7305C143.913 36.5505 141.223 38.6605 138.643 40.0605C135.983 41.5205 133.933 42.2505 132.493 42.2505C131.613 42.2505 131.003 41.9705 130.663 41.4105C130.063 40.4505 130.493 38.9805 131.953 37.0005C133.413 35.0405 135.503 33.1205 138.223 31.2405C139.983 30.0405 142.063 28.8905 144.463 27.7905C146.883 26.6705 149.423 25.7305 152.083 24.9705C152.803 23.3505 153.013 22.0605 152.713 21.1005C152.133 19.3605 149.833 18.7705 145.813 19.3305C144.353 19.5105 142.043 20.1005 138.883 21.1005C137.823 21.4405 137.023 21.6905 136.483 21.8505C135.963 21.9905 135.343 22.1405 134.623 22.3005C133.903 22.4405 133.333 22.5005 132.913 22.4805C132.493 22.4405 132.153 22.3205 131.893 22.1205C130.533 21.0805 130.603 19.2605 132.103 16.6605C133.003 15.0805 134.393 13.3305 136.273 11.4105C138.153 9.49046 140.123 7.75046 142.183 6.19046C144.263 4.63046 146.313 3.43046 148.333 2.59046C150.373 1.73045 151.943 1.53045 153.043 1.99045C154.843 2.73045 155.233 4.97045 154.213 8.71046C154.193 8.83045 154.123 8.92046 154.003 8.98046C153.903 9.04046 153.793 9.06046 153.673 9.04045C153.553 9.00045 153.463 8.93046 153.403 8.83046C153.343 8.71045 153.333 8.59045 153.373 8.47045C154.253 5.25045 154.023 3.36045 152.683 2.80045C151.823 2.44045 150.493 2.63045 148.693 3.37045C146.913 4.09045 144.933 5.26045 142.753 6.88046C140.633 8.44046 138.673 10.1505 136.873 12.0105C135.073 13.8705 133.733 15.5705 132.853 17.1105C131.613 19.2505 131.473 20.6805 132.433 21.4005C132.513 21.4805 132.623 21.5405 132.763 21.5805C132.923 21.6005 133.113 21.6005 133.333 21.5805C133.553 21.5605 133.763 21.5405 133.963 21.5205C134.183 21.4805 134.463 21.4205 134.803 21.3405C135.143 21.2605 135.423 21.1905 135.643 21.1305C135.883 21.0705 136.213 20.9805 136.633 20.8605C137.053 20.7405 137.373 20.6505 137.593 20.5905C137.833 20.5105 138.173 20.4005 138.613 20.2605C141.833 19.2405 144.193 18.6305 145.693 18.4305C150.193 17.8305 152.813 18.6305 153.553 20.8305C153.873 21.8505 153.743 23.1305 153.163 24.6705C156.243 23.8705 159.203 23.4005 162.043 23.2605C162.063 23.2605 162.073 23.2605 162.073 23.2605ZM148.573 30.3705C149.833 28.8505 150.833 27.4105 151.573 26.0505C146.573 27.5505 142.293 29.5305 138.733 31.9905C137.353 32.9305 136.123 33.9005 135.043 34.9005C133.983 35.9005 133.173 36.7905 132.613 37.5705C132.053 38.3505 131.663 39.0305 131.443 39.6105C131.243 40.2105 131.233 40.6605 131.413 40.9605C131.453 41.0205 131.513 41.0805 131.593 41.1405C131.693 41.2205 131.903 41.2805 132.223 41.3205C132.543 41.3605 132.933 41.3405 133.393 41.2605C133.853 41.2005 134.503 41.0005 135.343 40.6605C136.203 40.3205 137.163 39.8605 138.223 39.2805C139.903 38.3605 141.663 37.1005 143.503 35.5005C145.363 33.9205 147.053 32.2105 148.573 30.3705Z" fill="#121212"/><path d="M117.326 23.0798C117.366 23.1998 117.356 23.3198 117.296 23.4398C117.256 23.5398 117.176 23.6098 117.056 23.6498C112.076 25.4698 107.516 27.5298 103.376 29.8298C101.556 33.4098 99.5159 37.1198 97.2559 40.9598C96.1359 42.8598 95.0259 44.5698 93.9259 46.0898C92.8059 47.6098 91.7859 48.8598 90.8659 49.8398C89.9459 50.8398 89.0659 51.6698 88.2259 52.3298C87.3659 52.9898 86.6059 53.4598 85.9459 53.7398C85.2859 54.0198 84.6959 54.1598 84.1759 54.1598C83.9759 54.1598 83.7759 54.1398 83.5759 54.0998C83.0959 53.9798 82.7059 53.7098 82.4059 53.2898C82.1059 52.8698 81.9359 52.3398 81.8959 51.6998C81.8159 50.2598 82.3959 48.3998 83.6359 46.1198C84.8559 43.8398 86.8059 41.3998 89.4859 38.7998C93.0459 35.3398 97.4559 32.1398 102.716 29.1998C104.156 26.3398 104.996 24.4398 105.236 23.4998C105.096 23.5998 104.876 23.7598 104.576 23.9798C101.936 25.9398 99.9659 27.1498 98.6659 27.6098C96.5659 28.3098 95.3059 28.2298 94.8859 27.3698C94.6259 26.8698 94.7559 26.2398 95.2759 25.4798C95.7959 24.6998 96.5859 23.9498 97.6459 23.2298C98.2659 22.8298 98.8959 22.4898 99.5359 22.2098C100.176 21.9298 100.806 21.7398 101.426 21.6398C102.046 21.5398 102.546 21.6098 102.926 21.8498C103.406 22.1498 103.596 22.6498 103.496 23.3498C103.496 23.4098 103.476 23.4698 103.436 23.5298C103.416 23.5698 103.386 23.6098 103.346 23.6498C103.306 23.6898 103.256 23.7198 103.196 23.7398C103.136 23.7398 103.076 23.7398 103.016 23.7398C102.896 23.7198 102.796 23.6698 102.716 23.5898C102.636 23.4898 102.606 23.3798 102.626 23.2598C102.666 22.9198 102.606 22.6998 102.446 22.5998C102.126 22.3998 101.536 22.4398 100.676 22.7198C99.8359 22.9798 98.9859 23.3998 98.1259 23.9798C97.5259 24.3798 97.0159 24.7998 96.5959 25.2398C96.1759 25.6798 95.9059 26.0498 95.7859 26.3498C95.6459 26.6298 95.6059 26.8398 95.6659 26.9798C95.6859 27.0198 95.7359 27.0598 95.8159 27.0998C95.8759 27.1398 95.9759 27.1698 96.1159 27.1898C96.2559 27.2098 96.4259 27.2098 96.6259 27.1898C96.8259 27.1698 97.0759 27.1298 97.3759 27.0698C97.6759 26.9898 98.0059 26.8898 98.3659 26.7698C99.5859 26.3498 101.476 25.1898 104.036 23.2898C104.676 22.8098 105.066 22.5298 105.206 22.4498C105.526 22.2898 105.786 22.3198 105.986 22.5398C106.066 22.6198 106.116 22.6998 106.136 22.7798C106.176 22.8398 106.186 22.9998 106.166 23.2598C106.146 23.4998 106.066 23.8098 105.926 24.1898C105.806 24.5698 105.586 25.1298 105.266 25.8698C104.966 26.5898 104.566 27.4498 104.066 28.4498C107.946 26.3698 112.176 24.4898 116.756 22.8098C117.036 22.7098 117.226 22.7998 117.326 23.0798ZM96.4759 40.5098C98.4759 37.1498 100.316 33.8598 101.996 30.6398C97.2959 33.3598 93.3259 36.2898 90.0859 39.4298C87.5259 41.9298 85.6559 44.2598 84.4759 46.4198C83.2759 48.5998 82.7159 50.3398 82.7959 51.6398C82.8359 52.5598 83.1659 53.0898 83.7859 53.2298C84.3459 53.3698 85.0559 53.2198 85.9159 52.7798C86.7759 52.3398 87.7459 51.6298 88.8259 50.6498C89.9059 49.6698 91.1159 48.2998 92.4559 46.5398C93.7959 44.7998 95.1359 42.7898 96.4759 40.5098Z" fill="#121212"/><path d="M98.2724 22.8102C98.5324 22.7102 98.7224 22.8002 98.8424 23.0802C98.9624 23.3402 98.8924 23.5202 98.6324 23.6202C95.3124 25.0802 91.9024 26.8702 88.4024 28.9902C87.3424 29.6502 86.6124 30.0702 86.2124 30.2502C85.8124 30.4102 85.4824 30.4202 85.2224 30.2802C84.9224 30.1002 84.7824 29.7702 84.8024 29.2902C84.8024 28.5902 85.1424 27.2902 85.8224 25.3902C86.4224 23.6502 86.6724 22.6602 86.5724 22.4202C86.4524 22.4002 86.2624 22.4502 86.0024 22.5702C85.0624 23.0102 83.9324 23.6602 82.6124 24.5202C81.3124 25.3602 80.2324 26.0902 79.3724 26.7102C78.5124 27.3302 77.3524 28.1902 75.8924 29.2902L75.2324 29.8002C74.3524 30.4602 73.7224 30.7902 73.3424 30.7902C73.1424 30.7902 72.9724 30.7202 72.8324 30.5802C72.7324 30.4602 72.6724 30.3302 72.6524 30.1902C72.6324 30.0502 72.7624 29.7002 73.0424 29.1402C73.3024 28.5602 73.7524 27.8102 74.3924 26.8902C75.6324 25.1302 76.7824 23.7702 77.8424 22.8102C78.0624 22.6102 78.2724 22.6202 78.4724 22.8402C78.6724 23.0402 78.6624 23.2402 78.4424 23.4402C77.6024 24.2202 76.6624 25.3102 75.6224 26.7102C74.5824 28.1102 73.9324 29.1402 73.6724 29.8002C73.9324 29.6602 74.2724 29.4302 74.6924 29.1102L75.3824 28.6002C76.8624 27.4802 78.0324 26.6102 78.8924 25.9902C79.7524 25.3502 80.8524 24.6002 82.1924 23.7402C83.5324 22.8602 84.6824 22.2002 85.6424 21.7602C86.3424 21.4602 86.8524 21.4602 87.1724 21.7602C87.3324 21.9002 87.4324 22.0802 87.4724 22.3002C87.5124 22.5002 87.4924 22.7902 87.4124 23.1702C87.3324 23.5302 87.2324 23.8802 87.1124 24.2202C87.0124 24.5602 86.8524 25.0502 86.6324 25.6902C85.9924 27.4902 85.6724 28.6902 85.6724 29.2902C85.6724 29.3502 85.6824 29.4102 85.7024 29.4702C85.9224 29.4302 86.6724 29.0202 87.9524 28.2402C91.4724 26.1002 94.9124 24.2902 98.2724 22.8102Z" fill="#121212"/><path d="M77.6603 23.2C77.7803 23.24 77.8603 23.32 77.9003 23.44C77.9403 23.56 77.9303 23.68 77.8703 23.8C77.8303 23.9 77.7603 23.97 77.6603 24.01C76.7603 24.33 74.7703 25.5 71.6903 27.52C69.5103 28.96 67.8703 29.99 66.7703 30.61C65.6703 31.21 64.8203 31.51 64.2203 31.51C63.9003 31.51 63.6403 31.42 63.4403 31.24C63.2803 31.06 63.2003 30.83 63.2003 30.55C63.1803 30.27 63.2603 29.85 63.4403 29.29C63.6203 28.71 64.0103 27.92 64.6103 26.92C65.1903 25.9 65.9703 24.66 66.9503 23.2C67.1103 22.96 67.3103 22.93 67.5503 23.11C67.8103 23.27 67.8503 23.47 67.6703 23.71C66.9103 24.83 66.2703 25.83 65.7503 26.71C65.2303 27.59 64.8603 28.26 64.6403 28.72C64.4203 29.18 64.2603 29.57 64.1603 29.89C64.0603 30.19 64.0203 30.38 64.0403 30.46C64.0403 30.54 64.0503 30.59 64.0703 30.61C64.3103 30.79 65.1103 30.5 66.4703 29.74C67.3903 29.24 68.9703 28.26 71.2103 26.8C74.3303 24.74 76.3703 23.53 77.3303 23.17C77.4503 23.13 77.5603 23.14 77.6603 23.2ZM69.5603 18.61C69.5403 18.61 69.5203 18.61 69.5003 18.61C69.4803 18.59 69.4403 18.58 69.3803 18.58C69.3403 18.56 69.2603 18.53 69.1403 18.49C69.0403 18.45 68.9403 18.4 68.8403 18.34C68.7603 18.28 68.6803 18.2 68.6003 18.1C68.5403 18 68.5103 17.89 68.5103 17.77C68.4903 17.61 68.5403 17.47 68.6603 17.35C68.9003 17.09 69.3503 16.96 70.0103 16.96C70.1303 16.96 70.2303 17.01 70.3103 17.11C70.4103 17.19 70.4603 17.29 70.4603 17.41C70.4603 17.53 70.4103 17.64 70.3103 17.74C70.2303 17.82 70.1303 17.86 70.0103 17.86C69.9703 17.86 69.9303 17.86 69.8903 17.86C69.9903 17.96 70.0303 18.08 70.0103 18.22C69.9703 18.48 69.8203 18.61 69.5603 18.61Z" fill="#121212"/><path d="M67.8741 22.7503C67.9941 22.7903 68.0741 22.8703 68.1141 22.9903C68.1541 23.0903 68.1441 23.2003 68.0841 23.3203C68.0441 23.4203 67.9641 23.4903 67.8441 23.5303C66.2041 24.1303 63.5541 25.4603 59.8941 27.5203C57.3341 28.9803 55.5241 29.9403 54.4641 30.4003C53.5041 30.8003 52.8741 30.8103 52.5741 30.4303C52.3141 30.1303 52.3141 29.6903 52.5741 29.1103C52.8341 28.5303 53.3841 27.5703 54.2241 26.2303C54.7241 25.4703 55.0741 24.9003 55.2741 24.5203C55.9341 23.4003 56.2241 22.6503 56.1441 22.2703C55.9841 22.2703 55.7241 22.3903 55.3641 22.6303C53.9641 23.5103 51.8141 25.2203 48.9141 27.7603C47.3341 29.1403 46.2841 30.0003 45.7641 30.3403C45.2641 30.6803 44.8741 30.7503 44.5941 30.5503C44.4141 30.3103 44.3541 30.0403 44.4141 29.7403C44.4941 29.4203 44.7041 28.9303 45.0441 28.2703C46.4641 25.5503 47.1041 23.9303 46.9641 23.4103C46.7841 23.3903 46.4741 23.5103 46.0341 23.7703C45.6141 24.0103 45.0341 24.4103 44.2941 24.9703C43.5541 25.5103 42.9341 25.9803 42.4341 26.3803C41.9341 26.7803 41.2241 27.3403 40.3041 28.0603L39.6141 28.6303C37.5341 30.2903 36.1741 31.1203 35.5341 31.1203C35.3141 31.1203 35.1341 31.0403 34.9941 30.8803C34.5941 30.3803 35.1541 29.1603 36.6741 27.2203C38.0541 25.4403 39.4341 24.0003 40.8141 22.9003C41.0341 22.7203 41.2341 22.7503 41.4141 22.9903C41.6141 23.2103 41.5941 23.4103 41.3541 23.5903C40.1341 24.5903 38.8741 25.8903 37.5741 27.4903C36.6341 28.6703 36.0441 29.5603 35.8041 30.1603C36.4241 29.9003 37.5041 29.1603 39.0441 27.9403L39.7641 27.3703C42.4641 25.2103 44.3241 23.8103 45.3441 23.1703C46.3841 22.5303 47.1141 22.3803 47.5341 22.7203C47.7341 22.9003 47.8441 23.1703 47.8641 23.5303C47.8841 23.8903 47.7241 24.5003 47.3841 25.3603C47.0641 26.2003 46.5441 27.3103 45.8241 28.6903C45.6641 29.0103 45.5341 29.2803 45.4341 29.5003C45.8741 29.2003 46.8441 28.4003 48.3441 27.1003C51.2641 24.5203 53.4441 22.7803 54.8841 21.8803C55.7441 21.3203 56.3741 21.2303 56.7741 21.6103C57.2941 22.1303 57.0541 23.2503 56.0541 24.9703C55.8341 25.3503 55.4741 25.9303 54.9741 26.7103C53.8741 28.4503 53.3041 29.4903 53.2641 29.8303C53.4641 29.8103 53.7441 29.7303 54.1041 29.5903C55.1441 29.1303 56.9341 28.1803 59.4741 26.7403C63.1541 24.6603 65.8441 23.3203 67.5441 22.7203C67.6641 22.6803 67.7741 22.6903 67.8741 22.7503Z" fill="#121212"/><path d="M40.6077 22.8405C40.8877 22.7005 41.0877 22.7705 41.2077 23.0505C41.3477 23.3105 41.2777 23.5005 40.9977 23.6205C37.8977 25.1405 34.5277 25.8205 30.8877 25.6605C30.4477 25.6405 30.0177 25.6005 29.5977 25.5405C29.3177 26.2805 28.7977 27.0205 28.0377 27.7605C27.2977 28.4805 26.4577 29.1305 25.5177 29.7105C24.0377 30.6105 22.8177 31.0605 21.8577 31.0605C21.3977 31.0605 21.0277 30.9505 20.7477 30.7305C20.2077 30.2905 20.1177 29.5505 20.4777 28.5105C21.0177 26.9105 22.3177 25.0805 24.3777 23.0205C24.3777 22.8205 24.4377 22.6305 24.5577 22.4505C24.7777 22.1305 25.1777 21.9205 25.7577 21.8205C26.3577 21.7005 26.8977 21.7005 27.3777 21.8205C27.8177 21.9205 28.1977 22.0705 28.5177 22.2705C28.8577 22.4705 29.1277 22.7205 29.3277 23.0205C29.5477 23.3205 29.6977 23.6505 29.7777 24.0105C29.8177 24.2305 29.8277 24.4605 29.8077 24.7005C30.1677 24.7205 30.5377 24.7405 30.9177 24.7605C34.4177 24.9205 37.6477 24.2805 40.6077 22.8405ZM25.0677 28.9605C25.8877 28.4605 26.6277 27.9005 27.2877 27.2805C27.9477 26.6405 28.4177 26.0205 28.6977 25.4205C26.8377 25.1205 25.5477 24.5905 24.8277 23.8305C22.9677 25.7305 21.7977 27.3905 21.3177 28.8105C21.0977 29.4505 21.0977 29.8605 21.3177 30.0405C21.4577 30.2405 21.8977 30.2505 22.6377 30.0705C23.3577 29.8705 24.1677 29.5005 25.0677 28.9605ZM28.9377 24.5805C28.9577 24.4405 28.9477 24.3105 28.9077 24.1905C28.8677 23.9505 28.7777 23.7305 28.6377 23.5305C28.4977 23.3305 28.3477 23.1805 28.1877 23.0805C28.0277 22.9805 27.8477 22.9005 27.6477 22.8405C27.4477 22.7605 27.2777 22.7105 27.1377 22.6905C27.0177 22.6705 26.8977 22.6505 26.7777 22.6305C26.1777 22.5905 25.7077 22.6705 25.3677 22.8705C25.4077 22.9705 25.4177 23.0705 25.3977 23.1705C25.9577 23.8105 27.1377 24.2805 28.9377 24.5805Z" fill="#121212"/><path d="M25.9796 1.30003C27.7596 2.26003 28.1696 4.86003 27.2096 9.10003C27.1696 9.22003 27.0996 9.31003 26.9996 9.37003C26.8996 9.43003 26.7896 9.45003 26.6696 9.43003C26.5496 9.41003 26.4496 9.35003 26.3696 9.25003C26.3096 9.13003 26.2996 9.01003 26.3396 8.89003C27.1996 5.11003 26.9396 2.84003 25.5596 2.08003C24.3996 1.46003 22.6196 1.84003 20.2196 3.22003C17.8196 4.58003 15.5196 6.39003 13.3196 8.65003C11.1996 10.85 9.25961 13.36 7.49961 16.18C5.73961 19 4.30961 21.88 3.20961 24.82C2.20961 27.54 1.62961 29.93 1.46961 31.99C1.30961 34.05 1.60961 35.5 2.36961 36.34C3.12961 37.16 4.32961 37.29 5.96961 36.73C7.60961 36.19 9.59961 35 11.9396 33.16C13.1996 32.18 15.1196 30.55 17.6996 28.27C19.9996 26.27 21.7096 24.84 22.8296 23.98C23.9496 23.12 24.8096 22.64 25.4096 22.54C25.5296 22.52 25.6396 22.55 25.7396 22.63C25.8396 22.71 25.8996 22.81 25.9196 22.93C25.9396 23.05 25.9096 23.16 25.8296 23.26C25.7696 23.36 25.6796 23.41 25.5596 23.41C25.2796 23.45 24.8996 23.62 24.4196 23.92C23.9396 24.22 23.3096 24.69 22.5296 25.33C21.7696 25.95 21.1196 26.49 20.5796 26.95C20.0596 27.41 19.2996 28.08 18.2996 28.96C15.6996 31.22 13.7596 32.86 12.4796 33.88C9.01961 36.6 6.25961 37.96 4.19961 37.96C3.17961 37.96 2.34961 37.61 1.70961 36.91C0.969609 36.11 0.569609 34.88 0.509609 33.22C0.469609 31.58 0.749609 29.71 1.34961 27.61C1.96961 25.51 2.79961 23.32 3.83961 21.04C4.89961 18.76 6.19961 16.48 7.73961 14.2C9.29961 11.9 10.9496 9.85003 12.6896 8.05003C14.1896 6.47003 15.7596 5.09003 17.3996 3.91003C19.0396 2.73003 20.6396 1.88003 22.1996 1.36003C23.7796 0.82003 25.0396 0.80003 25.9796 1.30003Z" fill="#121212"/></svg>';
		$sitename        = get_bloginfo( 'name' );

		$h1 = __( 'A new website is on the way!', 'wp-module-coming-soon' );

		if ( $sitename ) {
			$tagline = get_bloginfo( 'description' );
			$h1      = $sitename;
			if ( $tagline ) {
				$h1 = $h1 . ' — ' . $tagline;
			}
		}

		$custom_logo_id = get_theme_mod( 'custom_logo' );

		$logo_image = '';
		if ( $custom_logo_id ) {
			$logo_url = wp_get_attachment_image_url( $custom_logo_id, 'full' );
			if ( $logo_url ) {
				$logo_image = '<img src="' . esc_url( $logo_url ) . '" alt="' . get_bloginfo( 'name' ) . ' Logo">';
			}
		}

		// setup args.
		$defaults   = array(
			'admin_screen_id'      => container()->plugin()->id,
			'admin_app_url'        => \admin_url( 'admin.php?page=newfold' ),
			'admin_notice_text'    => __( 'Your site has Coming Soon mode active.', 'wp-module-coming-soon' ),
			'template_page_title'  => __( 'Coming Soon!', 'wp-module-coming-soon' ),
			'template_styles'      => false,
			'template_content'     => false,
			'template_site_logo'   => $logo_image ?: $coming_soon_svg,
			'template_h1'          => $h1,
			'template_login_btn'   => false,
			'template_p'           => __( 'Signup to be the first to know when we launch.', 'wp-module-coming-soon' ),
			'template_msg_success' => __( 'Thank you, please check your email to confirm your subscription.', 'wp-module-coming-soon' ),
			'template_msg_active'  => __( 'Your email address is already subscribed to this website. Stay tuned to your inbox for our updates or try a different email address.', 'wp-module-coming-soon' ),
			'template_msg_invalid' => __( 'There was an error with your submission and you were not subscribed. Please try again with a valid email address.', 'wp-module-coming-soon' ),
			'template_email_ph'    => __( 'Enter your email address', 'wp-module-coming-soon' ),
			'template_subscribe'   => __( 'Subscribe', 'wp-module-coming-soon' ),
		);
		$this->args = apply_filters( 'newfold/coming-soon/filter/args', wp_parse_args( $container->has( 'comingsoon' ) ? $container['comingsoon'] : array(), $defaults ), $defaults, $container );

		if ( false !== $this->args['template_styles'] && isset( $container['plugin'] ) ) {
			// add plugin version to plugin styles file for cache busting.
			$this->args['template_styles'] = $this->args['template_styles'] . '?v=' . container()->plugin()->version;
		}

		new WooCommerceOptionsSync();

		// set up all actions.
		\add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );
		\add_action( 'init', array( __CLASS__, 'load_text_domain' ), 0 );
		\add_action( 'rest_api_init', array( $this, 'rest_api_init' ) );
		\add_action( 'newfold/onboarding/completed', array( $this, 'handle_onboarding_completed' ) );
		\add_action( 'admin_notices', array( $this, 'notice_display' ) );
		\add_action( 'template_redirect', array( $this, 'maybe_load_template' ) );
		\add_action( 'wp_ajax_newfold_coming_soon_subscribe', array( $this, 'coming_soon_subscribe' ) );
		\add_action( 'wp_ajax_nopriv_newfold_coming_soon_subscribe', array( $this, 'coming_soon_subscribe' ) );
		\add_action( 'plugins_loaded', array( $this, 'coming_soon_prevent_emails' ) );
		\add_filter( 'default_option_nfd_coming_soon', array( $this, 'filter_coming_soon_fallback' ) );
		\add_action( 'update_option_nfd_coming_soon', array( $this, 'on_update_nfd_coming_soon' ), 10, 2 );
		\add_action( 'update_option_mm_coming_soon', array( $this, 'on_update_mm_coming_soon' ), 10, 2 );
		\add_filter( 'jetpack_is_under_construction_plugin', array( $this, 'filter_jetpack_is_under_construction' ) );

		new AdminBarSiteStatusBadge( $container );
		new SitePreviewWarning();
		new PrePublishModal();
	}

	/**
	 * When the coming soon state is updated, make sure we trigger actions and update the legacy option value.
	 *
	 * @param mixed $old_value Old option value.
	 * @param mixed $value     New option value.
	 *
	 * @return mixed
	 */
	public function on_update_nfd_coming_soon( $old_value, $value ) {

		// Ensure the value is a boolean.
		$value = wp_validate_boolean( $value );

		// Trigger any actions associated with the coming soon state.
		$this->conditionally_trigger_coming_soon_action_hooks( $value );

		// When the database value changes for the new value, make sure we update the legacy value.
		remove_filter( 'update_option_mm_coming_soon', array( $this, 'on_update_mm_coming_soon' ) );
		update_option( 'mm_coming_soon', $value );
		add_filter( 'update_option_mm_coming_soon', array( $this, 'on_update_mm_coming_soon' ), 10, 2 );

		return $value;
	}

	/**
	 * When the coming soon state is updated, make sure we trigger actions and update the new option value.
	 *
	 * @param mixed $old_value Old option value.
	 * @param mixed $value     New option value.
	 *
	 * @return mixed
	 */
	public function on_update_mm_coming_soon( $old_value, $value ) {

		// Ensure the value is a boolean.
		$value = wp_validate_boolean( $value );

		// Trigger any actions associated with the coming soon state.
		$this->conditionally_trigger_coming_soon_action_hooks( $value );

		// When the database value changes for the legacy value, make sure we update the new value.
		remove_filter( 'update_option_nfd_coming_soon', array( $this, 'on_update_nfd_coming_soon' ) );
		update_option( 'nfd_coming_soon', $value );
		add_filter( 'update_option_nfd_coming_soon', array( $this, 'on_update_nfd_coming_soon' ), 10, 2 );

		return $value;
	}

	/**
	 * Conditionally trigger coming soon actions.
	 *
	 * The data module only starts listening for events after the init hook.
	 *  - If the init hook has run, we trigger the action immediately.
	 *  - If the init hook has not run, we add a callback to the init hook to trigger the action.
	 *
	 * @param bool $is_enabled True if coming soon is enabled, false otherwise.
	 *
	 * @return void
	 */
	public function conditionally_trigger_coming_soon_action_hooks( bool $is_enabled ) {

		if ( ! did_action( 'init' ) ) {
			add_action(
				'init',
				function () use ( $is_enabled ) {
					$this->conditionally_trigger_coming_soon_action_hooks( $is_enabled );
				},
				99
			);

			return;
		}

		if ( $is_enabled ) {
			$this->trigger_enabled_action_hook();
		} else {
			$this->trigger_disabled_action_hook();
		}
	}

	/**
	 * Trigger the enabled action hook.
	 *
	 * @return void
	 */
	public function trigger_enabled_action_hook() {
		if ( ! did_action( 'newfold/coming-soon/enabled' ) ) {
			do_action( 'newfold/coming-soon/enabled' ); // phpcs:ignore
		}
	}

	/**
	 * Trigger the disabled action hook.
	 *
	 * @return void
	 */
	public function trigger_disabled_action_hook() {
		if ( ! did_action( 'newfold/coming-soon/disabled' ) ) {
			do_action( 'newfold/coming-soon/disabled' ); // phpcs:ignore
		}
	}

	/**
	 * If nfd_coming_soon is not defined, set it to the value of mm_coming_soon.
	 *
	 * @return bool
	 */
	public function filter_coming_soon_fallback() {
		return wp_validate_boolean( get_option( 'mm_coming_soon', false ) );
	}

	/**
	 * Enqueue admin scripts.
	 */
	public function enqueue_admin_scripts() {
		$assets_dir = container()->plugin()->url . 'vendor/newfold-labs/wp-module-coming-soon/static/js/';

		wp_enqueue_script(
			'newfold-coming-soon-api',
			$assets_dir . 'coming-soon.js',
			array( 'wp-api-fetch', 'nfd-runtime', 'wp-i18n' ),
			container()->plugin()->version,
			true
		);

		self::load_js_translations(
			'newfold-coming-soon-api',
			'wp-module-coming-soon',
			NFD_COMING_SOON_DIR . '/languages'
		);
	}

	/**
	 * Register the coming soon route.
	 */
	public function rest_api_init() {
		new API\ComingSoon();
	}

	/**
	 * Handle the onboarding complete action.
	 * When the onboarding is complete, disable the coming soon page if the user has not opted in.
	 *
	 * @return void
	 */
	public function handle_onboarding_completed() {
		$coming_soon_service = container()->get( 'comingSoon' );

		$coming_soon_last_changed = $coming_soon_service->get_last_changed_timestamp();
		if ( ! $coming_soon_last_changed ) {
			$coming_soon_service->disable();
		}
	}

	/**
	 * Display coming soon notice.
	 */
	public function notice_display() {

		$screen = get_current_screen();

		$allowed_notice_html = array(
			// formatting.
			'strong' => array(),
			'em'     => array(),
			// and links.
			'a'      => array(
				'href'  => array(),
				'title' => array(),
			),
		);

		if (
			isComingSoonActive() && // coming soon is active.
			false === strpos( $screen->id, $this->args['admin_screen_id'] ) && // not on our app screen.
			current_user_can( 'manage_options' ) // current user can manage options.
		) {
			?>
			<div class='notice notice-warning'>
				<p><?php echo wp_kses( $this->args['admin_notice_text'], $allowed_notice_html ); ?></p>
			</div>
			<?php
		}
	}

	/**
	 * Load the coming soon page, if necessary.
	 */
	public function maybe_load_template() {
		if ( ! is_user_logged_in() || ( isset( $_SERVER['QUERY_STRING'] ) && 'preview=coming_soon' === $_SERVER['QUERY_STRING'] ) ) {
			if ( isComingSoonActive() ) {
				self::coming_soon_content( $this->args );
				die();
			}
		}
	}

	/**
	 * Render the coming soon page.
	 *
	 * @param array $args The args from container and defaults to pass to the template.
	 */
	public static function coming_soon_content( $args ) {
		$coming_soon_template = __DIR__ . '/template/index.php';
		load_template( $coming_soon_template, true, $args );
	}

	/**
	 * Handle the AJAX subscribe action.
	 */
	public function coming_soon_subscribe() {

		$response   = array();
		$a_response = array();
		$email      = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';

		if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( wp_unslash( $_POST['nonce'] ), 'newfold_coming_soon_subscribe_nonce' ) ) {

			$a_response['message'] = __( 'Gotcha!', 'wp-module-coming-soon' );
			$a_response['status']  = 'nonce_failure';

		} elseif ( ! is_email( $email ) ) {

			$a_response['message'] = __( 'Please provide a valid email address', 'wp-module-coming-soon' );
			$a_response['status']  = 'invalid_email';

		} else {

			// Initialize JetPack_Subscriptions.
			$jetpack = \Jetpack_Subscriptions::init();

			// ensure jetpack subscribe is callable, bail if not.
			if ( ! is_callable( array( $jetpack, 'subscribe' ) ) ) {
				$a_response['message'] = __( 'Jetpack encountered an error with the subscription', 'wp-module-coming-soon' );
				$a_response['status']  = 'jetpack-error';
				wp_send_json( $a_response );
				exit;
			}

			// Get JetPack response and subscribe email if response is true.
			$response = $jetpack->subscribe(
				$email,
				0,
				false,
				// See Jetpack subscribe `extra_data` attribute.
				array(
					'server_data' => jetpack_subscriptions_cherry_pick_server_data(),
				)
			);

			if ( isset( $response[0]->errors ) ) {

				$error_text = array_keys( $response[0]->errors );
				$error_text = $error_text[0];

				$a_response['message'] = __( 'There was an error with the subscription', 'wp-module-coming-soon' );
				$a_response['status']  = $error_text;

			} else {

				$a_response['message'] = __( 'Subscription successful', 'wp-module-coming-soon' );
				$a_response['status']  = 'success';

			}
		}
		wp_send_json( $a_response );
		exit;
	}

	/**
	 * When the coming soon module is enabled, add a filter to override Jetpack to prevent emails from being sent.
	 */
	public function coming_soon_prevent_emails() {

		if ( isComingSoonActive() ) {
			add_filter(
				'jetpack_subscriptions_exclude_all_categories_except',
				__CLASS__ . '\\coming_soon_prevent_emails_return_array'
			);
		}
	}

	/**
	 * Prevent emails from being sent.
	 *
	 * @return string[]
	 * @see coming_soon_prevent_emails
	 */
	public function coming_soon_prevent_emails_return_array() {

		return array(
			'please-for-the-love-of-all-things-do-not-exist',
		);
	}

	/**
	 * Filter Jetpack's is_under_construction_plugin to return true if the coming soon module is active.
	 *
	 * @see https://github.com/Automattic/jetpack/blob/trunk/projects/plugins/jetpack/_inc/lib/class.core-rest-api-endpoints.php#L1149-L1184
	 *
	 * @param bool $value Current value.
	 *
	 * @return bool
	 */
	public function filter_jetpack_is_under_construction( $value ) {
		if ( isComingSoonActive() ) {
			return true;
		}

		return $value;
	}

	/**
	 * Load text domain for Module
	 *
	 * @return void
	 */
	public static function load_text_domain() {

		\load_plugin_textdomain(
			'wp-module-coming-soon',
			false,
			NFD_COMING_SOON_DIR . '/languages'
		);
	}

	/**
	 * Sets translated strings for a script.
	 *
	 * @global WP_Scripts $wp_scripts    The WP_Scripts object for printing scripts.
	 *
	 * @param string      $script_handle Script handle the textdomain will be attached to.
	 * @param string      $domain        Text domain. Default 'default'.
	 * @param string      $languages_dir The full file path to the directory containing translation files.
	 * @return bool True if the text domain was successfully localized, false otherwise.
	 */
	public static function load_js_translations( $script_handle, $domain, $languages_dir ) {
		\add_filter(
			'load_script_translation_file',
			function ( $file, $handle, $domain ) use ( $script_handle, $languages_dir ) {
				global $wp_scripts;

				if ( $script_handle !== $handle ) {
					return $file;
				}

				$src = $wp_scripts->registered[ $handle ]->src ?? false;

				if ( ! $src ) {
					return $file;
				}

				$locale  = determine_locale();
				$baseurl = plugins_url( '/', $languages_dir );
				$hash    = md5( str_replace( $baseurl, '', $src ) );
				$file    = "{$languages_dir}/{$domain}-{$locale}-{$hash}.json";

				return $file;
			},
			10,
			3
		);

		return \wp_set_script_translations(
			$script_handle,
			$domain,
			$languages_dir
		);
	}
}
