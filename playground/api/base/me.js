import useFetcher from "~/utils/base/fetcher";

const me = {
  getMe: async ({ config }) => await useFetcher().get(`/me`, config),
  canAccess: async () => (
    useFetcher().post(`/me/exec/CanAccess`, [
      {"jsonrpc": "2.0","id": "menu.homepage", "method": "CanAccess","params": ["menu.homepage", {}]},
      {"jsonrpc": "2.0","id": "menu.profiles",  "method": "CanAccess","params": ["menu.profiles", {}]},
      {"jsonrpc": "2.0","id": "menu.subscribes","method": "CanAccess","params": ["menu.subscribes", {}]},
      {"jsonrpc": "2.0","id": "menu.monitor","method": "CanAccess","params": ["menu.monitor", {}]},
      {"jsonrpc": "2.0","id": "menu.favorites","method": "CanAccess","params": ["menu.favorites", {}]},
      {"jsonrpc": "2.0","id": "menu.trades","method": "CanAccess","params": ["menu.trades", {}]},
      {"jsonrpc": "2.0","id": "menu.my-deposites","method": "CanAccess","params": ["menu.my-deposites", {}]},
      {"jsonrpc": "2.0","id": "menu.trade-deposites","method": "CanAccess","params": ["menu.trade-deposites", {}]},
      {"jsonrpc": "2.0","id": "menu.payments","method": "CanAccess","params": ["menu.payments", {}]},
      {"jsonrpc": "2.0","id": "menu.return-requests","method": "CanAccess","params": ["menu.return-requests", {}]},
    ], {
      headers: { "Content-Type": "application/json+rpc-2.0" },
    })
  )
};

export default me;
