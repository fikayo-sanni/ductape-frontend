import React from "react";
import {
	Chart,
	Interval,
	Axis,
	Tooltip,
	Coordinate,
	Legend,
	View,
	Annotation,
	getTheme,
} from "bizcharts";



const RingGraph = ({ data = [], content = {}, intervalConfig = {}, color="#eee", size=10 }) => {
	const brandFill = getTheme().colors10[0];
	return (
		<Chart placeholder={false} height={150} padding="auto" autoFit>
			<Legend visible={false} />
			{/* 绘制图形 */}
			<View
				data={data}
				scale={{
					percent: {
						formatter: (val) => {
							return (val * 100).toFixed(2) + "%";
						},
					},
				}}
			>
				<Coordinate type="theta" innerRadius={0.2} />
				<Interval
					position="percent"
					adjust="stack"
					// color="type"
					// color={["type", ["rgba(100, 100, 255, 0.6)", "#eee"]]}
					color={["type", [color, "#eee"]]}
					size={7}
					// style={{ fillOpacity: 0.6 }}
					// label={['type', {offset: 40}]}
					{...intervalConfig}
				/>
			</View>
		</Chart>
	);
}

export default RingGraph