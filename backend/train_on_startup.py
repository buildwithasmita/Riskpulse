from pathlib import Path

from app.utils import generate_tools_data


def main() -> None:
    registry_path = Path(__file__).resolve().parent / "data" / "tools" / "registry.csv"

    try:
        if registry_path.exists():
            print(f"Registry already exists at {registry_path}")
        else:
            generate_tools_data()
            print(f"Registry created successfully at {registry_path}")
        print("RISKPULSE startup initialization completed successfully.")
    except Exception as exc:
        print(f"RISKPULSE startup initialization failed: {exc}")
        raise


if __name__ == "__main__":
    main()
