// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::{AppHandle, Manager};


#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn exit_app() {
  std::process::exit(0x0);
}


#[tauri::command]
fn init_app(app: AppHandle) {
  let _ = app.get_webview_window("login").unwrap().hide();
  let _ = app.get_webview_window("main").unwrap().show();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, exit_app, init_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
