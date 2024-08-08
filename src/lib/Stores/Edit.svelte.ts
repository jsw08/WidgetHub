type drag = {
    id: string;
    dragging: boolean;
    x: number;
    y: number;
}

class Store {
    edit: boolean = $state(true);
    drag: drag = $state({
        id: "",
        dragging: false,
        x: 0,
        y: 0,
    });
}

export const edit = new Store()