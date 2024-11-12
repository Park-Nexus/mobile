import {trpc} from "@src/trpc";

export function useParkingLot(lotId: number) {
    const subscription = trpc.parking.lot.get.singleSubscription.useSubscription(undefined, {
        onData(data) {
            console.log(data);
        },
        onStarted() {
            console.log("started");
        },
        onError(error) {
            console.log(error);
        },
    });
    console.log("subscription", subscription);
    const response = trpc.parking.lot.get.single.useQuery({
        id: lotId,
    });

    return response;
}
