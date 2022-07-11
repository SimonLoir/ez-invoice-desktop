#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use headless_chrome::Browser;
use std::env;
use std::fs;
use tauri_plugin_sql::TauriSql;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![print_pdf])
        .plugin(TauriSql::default())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn print_pdf() -> Result<String, String> {
    let result = headless_printer();

    match result {
        Ok(data) => Ok(data.to_string()),
        Err(data) => Err(data.to_string()),
    }
}

fn headless_printer() -> Result<String, anyhow::Error> {
    let browser = Browser::default()?;
    let tab = browser.wait_for_initial_tab()?;
    let tmp_dir = format!("{}ezbiz/", env::temp_dir().display());
    let tmp_html = format!("file://{}index.html", &tmp_dir);

    let data = tab
        .navigate_to(&tmp_html)?
        .wait_until_navigated()?
        .print_to_pdf(None)?;

    let tmp = format!("{}file.pdf", &tmp_dir);

    fs::write(&tmp, &data)?;

    tab.close(true)?;

    Ok(tmp)
}
