import {useNavigation} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {ScrollView, Text} from 'react-native';
import {Calendar, CalendarProps} from 'react-native-calendars';
import {useMakeBookingContext} from '../index.context';
import {Day} from './index.day';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useState} from 'react';
import {Button} from '@src/components/Button';
import dayjs from 'dayjs';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

export function DateTime() {
    const navigation = useNavigation();
    const {startTime, setStartTime, lowBoundaryDate, highBoundaryDate, setStep} = useMakeBookingContext();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const calendarProps: CalendarProps = {
        dayComponent: Day,
        hideArrows: true,
        enableSwipeMonths: true,
    };

    return (
        <SafeAreaView>
            <Header title="Select start time" backButtonVisible onBackButtonPress={() => navigation.goBack()} />

            <ScrollView>
                <Calendar {...calendarProps} />
                <Button
                    variant="green"
                    onPress={() => setDatePickerVisibility(true)}
                    text={dayjs(startTime).format('HH:mm')}
                />
            </ScrollView>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                date={startTime}
                mode="datetime"
                is24Hour
                minimumDate={lowBoundaryDate.toDate()}
                maximumDate={highBoundaryDate.toDate()}
                onConfirm={date => {
                    setStartTime(date);
                    setDatePickerVisibility(false);
                }}
                onCancel={() => setDatePickerVisibility(false)}
            />
            <Button variant="green" text="Next" onPress={() => setStep('VEHICLE')} />
        </SafeAreaView>
    );
}
