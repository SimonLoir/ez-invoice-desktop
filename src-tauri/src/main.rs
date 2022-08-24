#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use headless_chrome::Browser;
use std::env;
use std::fs;
use std::io::Write;
use tauri::Manager;
use tauri_plugin_sql::TauriSql;
use zip::write::FileOptions;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
                window.close_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![print_pdf, create_zip])
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

#[tauri::command]
fn create_zip(xml: String) -> Result<String, String> {
    let result = build_zip(xml);

    match result {
        Ok(data) => Ok(data.to_string()),
        Err(data) => Err(data.to_string()),
    }
}

fn build_zip(xml: String) -> Result<String, anyhow::Error> {
    let tmp_dir = format!("{}ezbiz/tmp.VAT", env::temp_dir().display());
    let path = std::path::Path::new(&tmp_dir);
    let file = std::fs::File::create(path)?;
    let mut writer = zip::ZipWriter::new(file);
    writer.start_file(
        "TvaList.xml",
        FileOptions::default().compression_method(zip::CompressionMethod::Deflated),
    )?;
    writer.write_all(xml.as_bytes())?;
    writer.finish()?;
    Ok(tmp_dir.into())
}
