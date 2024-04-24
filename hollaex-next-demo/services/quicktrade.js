import { api } from "./axios";

class QuickTradeService {
  async getCharts(pairs, quote = "usdt") {
    const data = await api.get(
      `/minicharts?assets=${pairs}&quote=${quote}`
    );

    const result = {};

    Object.keys(data).forEach((keyVal) => {
      data[keyVal].forEach(({ price, quote, symbol, time }) => {
        let symbolKey = symbol + "-" + quote;

        if (!result[symbolKey]) {
          result[symbolKey] = {
            price: [],
            time: [],
          };
        }

        result[symbolKey].price.push(price);
        result[symbolKey].time.push(time);
      });
    });

    return result;
  }
}

export const quickTradeService = new QuickTradeService();
