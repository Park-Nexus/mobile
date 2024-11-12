import {trpc} from "@src/trpc";

export function useParkingLot(lotId: number) {
    const response = trpc.parking.lot.get.single.useQuery({
        id: lotId,
    });
    trpc.parking.lot.get.singleSubscription.useSubscription(undefined, {
        onData() {
            response.refetch();
        },
        onStarted() {
            console.log("started");
        },
        onError(error) {
            console.log(error);
        },
    });

    return response;
}
