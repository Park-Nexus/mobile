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
    const {startTime, setStartTime, endTime, setEndTime, minimumStartTime, maximumStartTime, minimumEndTime, setStep} =
        useMakeBookingContext();

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

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
                    onPress={() => setStartDatePickerVisibility(true)}
                    text={`Start ${dayjs(startTime).format('HH:mm')}`}
                />
                <Button
                    variant="green"
                    onPress={() => setEndDatePickerVisibility(true)}
                    text={`End ${dayjs(endTime).format('HH:mm')}`}
                />
            </ScrollView>
            <DateTimePickerModal
                isVisible={isStartDatePickerVisible}
                date={startTime.toDate()}
                mode="datetime"
                is24Hour
                minimumDate={minimumStartTime.toDate()}
                maximumDate={maximumStartTime.toDate()}
                onConfirm={date => {
                    setStartTime(dayjs(date));
                    setStartDatePickerVisibility(false);
                }}
                onCancel={() => setStartDatePickerVisibility(false)}
            />
            <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                date={endTime.toDate()}
                mode="datetime"
                is24Hour
                minimumDate={minimumEndTime.toDate()}
                onConfirm={date => {
                    setEndTime(dayjs(date));
                    setEndDatePickerVisibility(false);
                }}
                onCancel={() => setEndDatePickerVisibility(false)}
            />
            <Button variant="green" text="Next" onPress={() => setStep('VEHICLE')} />
        </SafeAreaView>
    );
}
