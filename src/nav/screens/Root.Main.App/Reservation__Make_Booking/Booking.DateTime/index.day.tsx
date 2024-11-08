import {DateData} from 'react-native-calendars';
import {DayProps} from 'react-native-calendars/src/calendar/day';
import {useMakeBookingContext} from '../index.context';
import dayjs from 'dayjs';
import {Text, TouchableOpacity} from 'react-native';

type TDayProps = DayProps & {date?: DateData};
export function Day({date, state}: TDayProps) {
    const {startTime, setStartTime, lowBoundaryDate, highBoundaryDate} = useMakeBookingContext();

    const isOutOfBoundary =
        dayjs(date?.dateString).isBefore(lowBoundaryDate, 'day') ||
        dayjs(date?.dateString).isAfter(highBoundaryDate, 'day');

    const isDisabled = state === 'disabled' || isOutOfBoundary;
    const isSelected = dayjs(date?.dateString).isSame(startTime, 'day');

    const backgroundColor = isSelected ? 'teal' : 'white';
    const textColor = isDisabled ? '#b9b9b9' : isSelected ? 'white' : 'black';

    return (
        <TouchableOpacity
            onPress={() => (isDisabled ? {} : setStartTime(dayjs(date?.dateString).toDate()))}
            style={{
                backgroundColor,
                width: 38,
                height: 38,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Text style={{color: textColor}}>{date?.day}</Text>
        </TouchableOpacity>
    );
}
