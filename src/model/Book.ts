export class Book {
    id: number;
    name: string;
    author: string;
    year: number;
    summary: string;
    loanAmount: number;

    constructor(id: number, name: string, author: string, year: number, summary: string, loanAmount: number) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.year = year;
        this.summary = summary;
        this.loanAmount = loanAmount;
    }

    // Optional: Add a method to format the book details if needed
    getFormattedDetails() {
        return `${this.name} by ${this.author}, ${this.year}`;
    }
}
